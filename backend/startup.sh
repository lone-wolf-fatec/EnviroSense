#!/bin/bash
# startup.sh — inicia o backend Node primeiro, depois os scripts Python (receptor + simulador)
# usado como Startup Command do Azure App Service
# dependencias Python ja vem pre-instaladas em mqtt/vendor (instaladas no build)

export PYTHONPATH="/home/site/wwwroot/mqtt/vendor:$PYTHONPATH"

echo "=== Iniciando servidor Node em background ==="
node server.js &
NODE_PID=$!

echo "=== Aguardando o backend responder em http://localhost:${PORT:-8080} ==="
for i in $(seq 1 30); do
  if curl -s -o /dev/null "http://localhost:${PORT:-8080}"; then
    echo "=== Backend respondeu apos ${i}s ==="
    break
  fi
  sleep 1
done

echo "=== Iniciando receptor MQTT (Python) em background ==="
python3 mqtt/receptor_mongodb.py &

echo "=== Aguardando 5s para o receptor conectar ==="
sleep 5

echo "=== Iniciando simulador MQTT (Python) em background ==="
API_URL="http://localhost:${PORT:-8080}" python3 mqtt/simulador.py &

echo "=== Aguardando processo principal (Node) ==="
wait $NODE_PID