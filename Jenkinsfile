pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        bat(script: 'npm install', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
    stage('ionic serve') {
      steps {
        bat(script: 'ionic serve', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
  }
}