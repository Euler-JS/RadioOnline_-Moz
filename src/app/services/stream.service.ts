import { Injectable } from '@angular/core';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(
    private mediaStream : StreamingMedia,
    private nativeAudio: NativeAudio
  ) { }

  streamAudio()
  {
    let options: StreamingAudioOptions = {
      successCallback: ()=> {console.log()},
        errorCallback: () => {console.log()},
        initFullscreen: false,
        }
        this.mediaStream.playAudio("http://radio.garden/listen/ep-sofala/XJNnXjRh", options)
      }

      
    stopAudio()
    {
      this.mediaStream.stopAudio()
    }

    stream2()
    {
      this.nativeAudio.preloadComplex("120001", "http://radio.garden/listen/ep-sofala/XJNnXjRh", 1,1,0)
      .then(info=>{
        this.nativeAudio.play("120001");
      })
    }
}
