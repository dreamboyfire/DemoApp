pipeline {
  agent any
  stages {
    stage('ionic build') {
      steps {
        bat(script: 'ionic build --prod', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
  }
}