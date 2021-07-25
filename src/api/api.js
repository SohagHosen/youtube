const KEY = "AIzaSyDHTvxR9b9eMPkcts0DSTun7xdxt31YHsI";
export const recomandedVideoApi = ()=>{
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${KEY}`
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
export const videoInfo = (videoId)=>{
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.items[0]);
  }

export const channelInfo = (channelId) => {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.items[0]);
};
export const searchVideos = (searchKeyWord) => {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchKeyWord}&key=${KEY}`
  )
    .then((response) => response.json())
    .then((data) => data);
};