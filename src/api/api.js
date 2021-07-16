const KEY = "AIzaSyDHTvxR9b9eMPkcts0DSTun7xdxt31YHsI";
export const recomandedVideoApi = ()=>{
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=20&key=${KEY}`
    )
      .then((response) => response.json())
      .then((data) => data);
}
