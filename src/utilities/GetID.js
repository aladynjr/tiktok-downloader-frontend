

function GetID(link) {
    const getTiktokID = /tiktok\.com(.*)\/video\/(\d+)/gm.exec(link);
    //console.log(getTiktokID[2])z
    return getTiktokID[2];
  }

  export default GetID;