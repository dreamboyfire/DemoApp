pipeline {
  agent any
  stages {
    stage('ionic build') {
      steps {
        bat(script: 'ionic build --prod', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
    stage('hcp') {
      steps {
        bat(script: 'cordova-hcp build', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
    stage('commit') {
      steps {
        bat(script: 'git commit -m "new version"', encoding: 'utf8', returnStatus: true, returnStdout: true)
      }
    }
    stage('git push') {
      steps {
        bat 'git push'
      }
    }
  }
}