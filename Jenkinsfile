pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        bat(script: 'npm install', encoding: 'utf-8', returnStatus: true, returnStdout: true)
      }
    }
  }
}