#!/bin/bash

# --- CONFIGURATION ---
MYSQL_CONTAINER_NAME="merittest-db"
MYSQL_ROOT_PASSWORD="AczWYdrkdcEjhEPmgpomIXvCcNRQclCk"
MYSQL_DATABASE="merit_db"
MYSQL_PORT=3307

# Start MySQL in Docker
echo "🚀 Starting MySQL container..."
docker run --rm -d \
  --name $MYSQL_CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  -p $MYSQL_PORT:3306 \
  mysql:8

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to start..."
sleep 15

# Start Ngrok tunnel
echo "🌐 Starting Ngrok tunnel on port $MYSQL_PORT..."
ngrok tcp $MYSQL_PORT > /dev/null &

# Wait for ngrok to generate URL
sleep 5

# Fetch the public Ngrok TCP address
NGROK_API_URL="http://127.0.0.1:4040/api/tunnels"
NGROK_URL=$(curl -s $NGROK_API_URL | grep -Eo 'tcp://[^"]+')

if [ -z "$NGROK_URL" ]; then
  echo "❌ Ngrok tunnel failed to start or Ngrok is not running."
  echo "Try manually running: ngrok tcp $MYSQL_PORT"
  exit 1
fi

echo "✅ Ngrok MySQL tunnel is live!"
echo "🔗 Connection string:"
echo ""
echo "HOST:PORT = ${NGROK_URL#tcp://}"
echo "USER = root"
echo "PASSWORD = $MYSQL_ROOT_PASSWORD"
echo "DATABASE = $MYSQL_DATABASE"
echo ""
echo "📌 Example SQLAlchemy URL:"
echo "mysql+pymysql://root:$MYSQL_ROOT_PASSWORD@${NGROK_URL#tcp://}/$MYSQL_DATABASE"
