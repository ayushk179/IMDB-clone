
import React, { Component } from 'react'
// import {movies} from './getMovies';
import axios from 'axios'
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

   async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d57fbad9f2c846f00c0af4f669bcba01&language=en-US&page=${this.state.currPage}`)
        console.log("Didmount");
        let data=res.data
        console.log(data.results);

        this.setState({
            movies:[...data.results]
        })
        console.log('componentDidMount');
    }


  changeMovies=async ()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d57fbad9f2c846f00c0af4f669bcba01&language=en-US&page=${this.state.currPage}`)
    console.log("Didmount");
    let data=res.data
    console.log(data.results);

    this.setState({
        movies:[...data.results]
    })
  }

  handleLeft=()=>{

    if(this.state.parr.length !=1){
    this.setState({
        currPage:this.state.currPage-1
    },this.changeMovies)
        }
  }

  handleRight=()=>{
      let temparr=[]

      for(let i=1;i<=this.state.parr.length+1;i++){
          temparr.push(i);
      }
      this.setState({
          parr:[...temparr],
          currPage:this.state.currPage+1
      },this.changeMovies)
      

}

handleClick=(value)=>{
    if(value != this.state.currPage)
        this.setState({
        currPage:value
     },this.changeMovies)
}


handlefavmovie=(movie)=>{
    let olddata= JSON.parse(localStorage.getItem("movies") || "[]");
    if(this.state.favourites.includes(movie.id)){
        olddata=olddata.filter((m)=>m.id!=movie.id)
    }else{
       olddata.push(movie)
    }
      localStorage.setItem("movies",JSON.stringify(olddata));
      console.log(olddata);
      this.handleFavouritesState();
}

handleFavouritesState=()=>{
    let olddata=JSON.parse(localStorage.getItem("movies") || "[]");
    let temp=olddata.map((movie)=>movie.id);
    this.setState({
        favourites:[...temp]
    })
}

  render() {
    //   let movie=movies.results;
    console.log(this.state.currPage);
    return (
      <>
      {
          this.state.movies.length == 0 ? 
          <div class="spinner-border text-primary" role="status" >
          <span class="visually-hidden">Loading...</span>
          </div>
          :   <div>
              <h3 className="text-center"><strong>Trending</strong></h3>
              <div className="movies-list">{
                  this.state.movies.map((movieObj)=>(
              <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt="..." style={{height:'40vh'}} />
        {/* <div className="card-body"> */}
          <h1 className="card-title movies-title">{movieObj.title}</h1>
          {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
          <div className="button-wrapper" style={{display:'flex' ,width:'100%', justifyContent:"center"}}>
              { this.state.hover == movieObj.id &&
          <a href="#" className="btn btn-primary" onClick={()=>this.handlefavmovie(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from Favourites": "Add to Favourites"}</a>
              }
          </div>
        {/* </div> */}
      </div>
                  ))
        }
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
      <nav aria-label="Page navigation example">
       <ul class="pagination">
       <li class="page-item"><a class="page-link" href="#" onClick={this.handleLeft}>Previous</a></li>
       {
           this.state.parr.map((value)=>(
       <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleClick(value)}>{value}</a></li>
           ))
       }
       <li class="page-item"><a class="page-link" href="#" onClick={this.handleRight}>Next</a></li>
    </ul>
   </nav>
   </div>
    </div>
      }
      </>
    )
  }
}
