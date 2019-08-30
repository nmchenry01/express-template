#!/bin/bash
docker exec -it local_postgres psql -U postgres -c "create database database_development"
