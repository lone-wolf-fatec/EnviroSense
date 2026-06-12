# receptor_mongodb.py
# escuta o broker MQTT e salva cada medição no MongoDB (coleção temporária)
# timestamp = momento exato que o dado chegou no Mongo
# processado = False até o servico_transferencia.js mover pro PostgreSQL

import paho.mqtt.client as mqtt
import json
import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', 'backend', '.env'))

MONGO_URL = os.getenv('MONGO_URL', 'mongodb+srv://envirosense:Carlos1313*@cluster0.jfw9kcd.mongodb.net/envirosense?retryWrites=true&w=majority')

# conecta no MongoDB Atlas e acessa a coleção temporária
colecao = MongoClient(MONGO_URL)['envirosense']['medicoes_temporarias']

def on_message(client, userdata, msg):
  try:
    dados = json.loads(msg.payload.decode())

    resultado = colecao.insert_one({
      'uid_estacao':    dados['uid'],
      'nome_parametro': dados['nome_parametro'],
      'valor_bruto':    float(dados['valor']),
      'timestamp':      datetime.now(),  # momento que o dado entrou no Mongo
      'processado':     False            # vira True quando transferido pro PostgreSQL
    })

    print(f"[MongoDB] Salvo: {dados['uid']} | {dados['nome_parametro']} = {dados['valor']} (ID: {resultado.inserted_id})")

  except Exception as e:
    print(f"[MongoDB] Erro ao salvar: {e}")

cliente = mqtt.Client()
cliente.on_message = on_message
cliente.connect('broker.emqx.io', 1883)
cliente.subscribe('envirosense/medicoes')
print('[MongoDB] Receptor iniciado — escutando envirosense/medicoes')
cliente.loop_forever()