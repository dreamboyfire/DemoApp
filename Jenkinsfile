pipeline {
  agent any
  stages {
    stage('ionic build') {
      steps {
        bat(script: 'ionic build --prod', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
    stage('') {
      steps {
        bat(script: 'cordova-hcp build', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
  }
}