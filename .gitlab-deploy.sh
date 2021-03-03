#!/bin/bash
#Get servers list
set -f
string=$DEPLOY_SERVER
array=(${string//,/ })
#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do  
      echo "Deploy project on server ${array[i]}"    
      ssh ubuntu@${array[i]} "cd /var/www && docker run -d -p 8080:80 registry.gitlab.com/nishranjan/bpcl/client:latest"
done