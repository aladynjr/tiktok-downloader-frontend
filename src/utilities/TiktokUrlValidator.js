function TiktokUrlValidator(url, SuccessFunction, FailFunction) {

    let domain = url.split('/')[2];

    if (domain === 'www.tiktok.com' || domain === 'vm.tiktok.com') {

      SuccessFunction()
    } else {

      FailFunction()
    }
  }

  export default TiktokUrlValidator;