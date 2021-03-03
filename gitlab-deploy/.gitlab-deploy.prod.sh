set — f
string=$DEPLOY_SERVER
array=(${string//,/ })
for i in "${!array[@]}"; do  
  echo “Deploy project on server ${array[i]}”
  ssh ubuntu@${array[i]} “cd ./Pardo/vr && git stash && git checkout $CI_BUILD_REF_NAME && git stash && git pull origin master && sudo yarn install && sudo npm run production”
done

