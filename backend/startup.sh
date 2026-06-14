#!/bin/bash
# startup.sh — inicia o backend Node e os scripts Python (receptor + simulador)
# usado como Startup Command do Azure App Service
# dependencias Python ja vem pre-instaladas em mqtt/vendor (instaladas no build)

export PYTHONPATH="/home/site/wwwroot/mqtt/vendor:$PYTHONPATH"

echo "=== Iniciando receptor MQTT (Python) em background ==="
python3 mqtt/receptor_mongodb.py &

echo "=== Aguardando 5s para o receptor conectar ==="
sleep 5

echo "=== Iniciando simulador MQTT (Python) em background ==="
API_URL="http://localhost:${PORT:-8080}" python3 mqtt/simulador.py &

echo "=== Iniciando servidor Node ==="
node server.js