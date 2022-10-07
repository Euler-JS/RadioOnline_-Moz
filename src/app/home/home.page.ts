import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StreamService } from '../services/stream.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public element: string;
  audioUrl: string = ""
  play:boolean= false
  reproduzindo: boolean = false
  esperando: boolean = false
  waitingSwitch: boolean = false
  containerPulse
  selecionadoAnterior = null

//   <audio controls>
//   <source src="http://uk7.internet-radio.com:8188/live" type="audio/mpeg">
//   <source src="http://uk7.internet-radio.com:8188/live" type="audio/ogg">
// </audio>
  programaDaRadio =
  [
    {
      "hora": "06:00 - 08:30",
      "descricao": "Music Masters Radio",
      "link": "http://us3.internet-radio.com:8592/live",
      "img": "../../assets/imags/img1.jpg"
    },
    {
      "hora": "08:35 - 09:00",
      "descricao": "Morning Devocional Radio",
      "link": "http://us3.internet-radio.com:8179/live",
      "img": "../../assets/imags/img2.jpg"
    },
    {
      "hora": "10:35 - 11:30",
      "descricao": "Riddin1 Radio",
      "link": "http://us2.internet-radio.com:8183/live",
      "img": "../../assets/imags/img3.png"
    },
    {
      "hora": "11:35 - 12:00",
      "descricao": "KCVR ChileVielle Radio",
      "link": "http://us3.internet-radio.com:8313/live",
      "img": "../../assets/imags/img4.jpg"
    },
    {
      "hora": "12:05 - 13:00",
      "descricao": "Programa Livre",
      "link": "http://uk7.internet-radio.com:8188/live",
      "img": "../../assets/imags/img5.jpg"
    },
    {
      "hora": "13:05 - 14:00",
      "descricao": "Time 2 Dance Radio",
      "link": "http://uk6.internet-radio.com:8332/live",
      "img": "../../assets/imags/img6.jpg"
    },
  ]

  paraVer = 2
  audio = new Audio("http://uk7.internet-radio.com:8188/live.m3u")
  constructor(
    private stream: StreamService,
    private plt: Platform
    
  ) {
    // this.streamAudio()
    plt.ready().then(()=>
    {
      try {
        this.containerPulse = document.getElementById("containerPulse")
      this.containerPulse.style.display = "none"
      } catch (error) {
        console.log("Erro ao tentar fazer display none");
        
      }
      

      this.audio.onplaying = ()=>
      {
        console.log("Is playing");
        this.reproduzindo = true;
        this.esperando = false;
        document.getElementById("containerPulse").style.display = "none"
        
      }

      this.audio.onpause = ()=>
      {
        console.log("Em pause");
        this.reproduzindo = false
      }

      
      this.audio.onwaiting = () =>
      {
        this.waitingSwitch = this.esperando
        this.esperando = true;        
        console.log("Espserando");
      }
      
      
    })

    

   
  }

  ionViewWillEnter()
  {
  }
  radioSelected()
  {
    console.log("alo");
    
  }

  streamAudio()
  {
    
    if(!this.play)
    {
      this.esperando = false
      this.containerPulse.style.display = "block"
      this.audio.load()
      this.audio.play().then(_ => {
        // Automatic playback started!
        // Show playing UI.
        this.play = true
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
        // this.esperando = true
        this.audio.remove()
        console.log("www ",error);
        

      });
      

      
    }
    else
    {
      this.containerPulse.style.display = "none"
      this.audio.pause()
      this.play = false
    }
    
    // this.stream.streamAudio()
    // this.stream.stream2()
  }

  stopAudio()
  {
    try {
      this.stream.stopAudio()
      this.anulaEstado()
    } catch (error) {
      console.log("Deu erro");
      this.anulaEstado()
       
    }
    
  }

  ngOnInit()
  {
    this.element = `<audio controls src="https://radio2-joaoalber.pitunnel.com/liveigrejavfc"></audio>`;
  }

  changeSegment(event)
  {
    this.paraVer = parseInt(event.detail.value)
    console.log("a ", this.paraVer);
    
    switch (event.detail.value) {
      
      case "1":
        console.log("Escutar Radio");
        
        break;
      case "2":
        console.log("Programacao da Radio");
        break;
      case "3":
        console.log("Igreja");
        break
      case "4":
        console.log("Pontos de Oracao");
        break;
          
          
    }
  }

  anulaEstado()
  {
    this.reproduzindo = false
    this.play = false
    this.esperando = false;
  }

  playAudio(id)
  {
    
    let audioPlayer = <HTMLAudioElement> document.getElementById(id)
    let card = <HTMLElement> document.getElementById("card_"+id)
    let progress = <HTMLElement> document.getElementById("progress_"+id)
    let gif = <HTMLElement> document.getElementById("gif_"+id)
    if(this.selecionadoAnterior == null)
    {
      console.log(this.selecionadoAnterior, id);
      audioPlayer.play()
      this.selecionadoAnterior = id
      
      card.style.filter = "drop-shadow(10px 38px 30px black)"
      card.style.marginBottom = "64px"
      progress.style.display = "block"
      gif.style.opacity = "0.6"
    }  
    else if(this.selecionadoAnterior == id)
    {
      audioPlayer.pause()
      card.style.filter = "sepia(1)"
      card.style.marginBottom = "0px"
      progress.style.display = "none"
      gif.style.opacity = "0"
      this.selecionadoAnterior = null
    } 
    else
    {
      let audioPlayerAnterior = <HTMLAudioElement> document.getElementById(this.selecionadoAnterior)
      let cardAnterior = <HTMLElement> document.getElementById("card_"+this.selecionadoAnterior)
      let progressAnterior = <HTMLElement> document.getElementById("progress_"+this.selecionadoAnterior)
      let gifAnterior = <HTMLElement> document.getElementById("gif_"+id)
      audioPlayerAnterior.pause()
      cardAnterior.style.filter = "sepia(1)"
      cardAnterior.style.marginBottom = "0px"
      progressAnterior.style.display = "none"
      gifAnterior.style.opacity = "0"
      this.selecionadoAnterior = null
      this.playAudio(id)
      // audioPlayer.play()
    } 
  }
  
}
