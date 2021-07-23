const KEY = "AIzaSyDHTvxR9b9eMPkcts0DSTun7xdxt31YHsI";
export const recomandedVideoApi = ()=>{
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=BD&maxResults=20&key=${KEY}`
    )
      .then((response) => response.json())
      .then((data) => data);
}
export const relatedVideoApi = (videoId)=>{
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&relatedToVideoId=${videoId}&type=video&key=${KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      let newArray = [];
      newArray = data.items.filter((item) => {
        if (item.snippet) {
          return item;
        }
      });
      return newArray;
    });
}
