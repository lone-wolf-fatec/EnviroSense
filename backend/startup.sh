#!/bin/bash
# startup.sh — inicia o backend Node e os scripts Python (receptor + simulador)
# usado como Startup Command do Azure App Service

echo "=== Verificando/instalando pip ==="
if ! command -v pip3 >/dev/null 2>&1 && ! command -v pip >/dev/null 2>&1; then
  echo "pip nao encontrado, instalando via get-pip.py..."
  curl -sS https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
  python3 /tmp/get-pip.py --quiet
fi

echo "=== Instalando dependencias Python ==="
python3 -m pip install -r mqtt/requirements.txt --quiet --break-system-packages 2>/dev/null \
  || python3 -m pip install -r mqtt/requirements.txt --quiet

echo "=== Iniciando receptor MQTT (Python) em background ==="
python3 mqtt/receptor_mongodb.py &

echo "=== Aguardando 5s para o receptor conectar ==="
sleep 5

echo "=== Iniciando simulador MQTT (Python) em background ==="
API_URL="http://localhost:${PORT:-8080}" python3 mqtt/simulador.py &

echo "=== Iniciando servidor Node ==="
node server.js