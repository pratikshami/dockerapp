FROM pratiksha12/jenkins

Run npm install gulp-cli -g
Run npm install gulp

#adding all the source code to /data/artifact
RUN mkdir -p "/data/artifact"
WORKDIR /data/artifact/

#Adding the required source code and dependencies for running the application

#for CI
ADD node_modules node_modules
ADD models models
ADD html html
ADD routes routes
ADD jshint-report jshint-report
ADD mocha-report mocha-repot
ADD app.js gulpfile.js circle.yml package.json ./

#Setting timezone to match time zone of sonar server
RUN echo "Asia/Kolkata" > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata

VOLUME ['./tmp']

CMD ["gulp"]
