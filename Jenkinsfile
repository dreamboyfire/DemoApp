pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        bat(script: 'npm install', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
  }
}