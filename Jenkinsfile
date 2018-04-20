pipeline {
  agent any
  stages {
    stage('ionic serve') {
      steps {
        bat(script: 'ionic serve', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
  }
}