

function GetID(link) {
  if(link.includes('www.tiktok.com/@')){

    const getTiktokID = /tiktok\.com(.*)\/video\/(\d+)/gm.exec(link);
    console.log(getTiktokID[2])
    return getTiktokID[2];
  } else if (link.includes('vm.tiktok.com')){
    const linkexample = 'https://vm.tiktok.com/ZMF28AqmY/'
    //get link id that comes after com/ while also ignoring / on the end, and sometimes there is https at the beginning

    const getTiktokID = /^http(s|):\/\/vm\.tiktok\.com\/([^\/]+)(\/|)$/.exec(link);
    console.log(getTiktokID[2])

    return getTiktokID[2];
  } else if (link.includes('tiktok.com/t')){
    const linkexample = 'https://www.tiktok.com/t/ZTRmHPdAS/';
    //get link id that comes after com/t/ while also ignoring / on the end, and sometimes there is https at the beginning

    const getTiktokID = /^http(s|):\/\/([^.]*)\.tiktok\.com\/t\/([^\/]+)(\/|)$/.exec(link);
    console.log(getTiktokID[3])
    return getTiktokID[3];

  }
  }

  export default GetID;