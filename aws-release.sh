aws elasticbeanstalk create-application --application-name gifchat #\
#--endpoint-url  https://gifchat.us-east-1.elasticbeanstalk.com 
#--region us-east-1

aws elasticbeanstalk  create-environment --application-name gifchat \
--environment-name gifchat-env --cname-prefix gifchat