# multiservice-docker
Project[https://roadmap.sh/projects/multiservice-docker](https://roadmap.sh/projects/multiservice-docker)

1. Create Secrets for Mongo
   ```bash
   mkdir -p secrets
   touch mongo_root_password.txt mongo_root_user.txt
   printf "root\n" > secrets/mongo_root_user.txt
   openssl rand -base64 24 > secrets/mongo_root_password.txt
   ```

2. Docker start
   ```bash
   docker compose up -d
   ```

3. Test API
   ```bash
   curl -X POST http://localhost/api/messages \
    -H "Content-Type: application/json" \
    -d '{"text":"hello from mongo"}'

   curl http://localhost/api/messages
   ```
