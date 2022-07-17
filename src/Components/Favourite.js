import React, { Component } from 'react'
import {movies} from './getMovies'

export default class Favourite extends Component {
  constructor(){
    super();
    this.state={
      genres:[],
      currgen:'All genres',
      movies:[],
      currtext:'',
      limit:5,
      currPage:1
    }
  }
  componentDidMount(){
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let data=JSON.parse(localStorage.getItem('movies') || "[]");

    
    let temp=[]
    data.forEach((movieObj)=>{
     if(!temp.includes(genreids[movieObj.genre_ids[0]])){
        temp.push(genreids[movieObj.genre_ids[0]])  
     }
    })
    temp.unshift('All genres');
    
    this.setState({
      movies:[...data],
      genres:[...temp]
    })
  }

  onClickChangeGenre=(genre)=>{
    this.setState({
      currgen:genre
    })

    console.log(this.state.currgen);
  }

  setPopularityDesc=()=>{
    let temp=this.state.movies;
    temp.sort((objA,objB)=>{
      return objB.popularity-objA.popularity
    })
    this.setState({
      movies:[...temp]
    })
  }
  setPopularityAsc=()=>{
    let temp=this.state.movies;
    temp.sort((objA,objB)=>{
      return objA.popularity-objB.popularity
    })

    this.setState({
      movies:[...temp]
    })
  }

  setRatingDesc=()=>{
    let temp=this.state.movies;
    temp.sort((objA,objB)=>{
      return objB.vote_average-objA.vote_average
    })
    this.setState({
      movies:[...temp]
    })
  }
  setRatingAsc=()=>{
    let temp=this.state.movies;
    temp.sort((objA,objB)=>{
      return objA.vote_average-objB.vote_average
    })

    this.setState({
      movies:[...temp]
    })
  }

  handlePageChange=(page)=>{
    this.setState({
      currPage:page
    })
  }

  OnDeleteChange=(id)=>{
    let newarr=[]
    newarr=this.state.movies.filter((movieObj)=>movieObj.id !=id);
    this.setState({
      movies:[...newarr]
    })
     localStorage.setItem("movies",JSON.stringify(newarr))
  }
  
  render() {

    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    // let movie=movies.results
    // this.setState({
    //   genres:[...temp]
    // })

    let filterArr=[]

    if(this.state.currtext == ''){
      filterArr=this.state.movies;
    }
    else{

       filterArr=this.state.movies.filter((movieObj)=>{
         let title=movieObj.original_title.toLowerCase();
         return title.includes(this.state.currtext.toLowerCase());

       })
    }

    // if(this.state.currgen == 'All genres'){
    //   filterArr=this.state.movies;
    // }
    if(this.state.currgen != 'All genres'){
      filterArr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]] === this.state.currgen)
    }

    let pages= (Math.ceil(filterArr.length/this.state.limit));
    let pageArr=[];

    for(let i=1;i<=pages;i++){
      pageArr.push(i);
    }

    let si=(this.state.currPage-1)*this.state.limit;
    let ei=si+this.state.limit;
    filterArr=filterArr.slice(si,ei);
    
    return (
      <div>
          <>
          <div className="container">
             <div className="row">
               <div className="col-3">
               <ul class="list-group favourites-genres">
                 {
                   this.state.genres.map((genresObj)=>(
                    this.state.currgen == genresObj ?
                    <li class="list-group-item" style={ { background:'#3f51b5', color:'white',fontWeight:'bold' }}>{genresObj}</li>:
                    <li class="list-group-item" style={ { background:'white', color:'#3f51b5' }} onClick={()=>this.onClickChangeGenre(genresObj)}>{genresObj}</li>
                   ))
                 }
               </ul>
               </div>
             <div className="col-9">
                 <div className="row" favourite-table>
                <input type="text"  className="input-group-text col" placeholder='Search Box' value={this.state.currtext} onChange={(e)=>this.setState({currtext:e.target.value})}/>
                <input type="number"  className="input-group-text col" placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                </div>
                <table class="table">
                  <thead>
                  <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fa fa-sort-up" onClick={()=>this.setPopularityDesc()}></i>popularity<i class="fa fa-sort-down" onClick={()=>this.setPopularityAsc()}></i></th>
                  <th scope="col"><i class="fa fa-sort-up" onClick={()=>this.setRatingDesc()}></i>Rating<i class="fa fa-sort-down" onClick={()=>this.setRatingAsc()}></i></th>
                  <th scope="col"></th>
                  </tr>
                 </thead>
                 <tbody>
                   {
                     filterArr.map((movieObj)=>(
                      <tr> 
                      <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/>{movieObj.original_title}</td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td><button type="button" class="btn btn-danger" onClick={()=>this.OnDeleteChange(movieObj.id)}>Delete</button></td>
                      </tr>
                     ))
                   }
                 </tbody>
                 </table>
                 <nav aria-label="Page navigation example">
                   <ul class="pagination">
                     {
                       pageArr.map((page)=>(
                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                       ))
                     }
                 </ul>
                </nav>
             </div>
            </div>
          </div>
          </>
      </div>
    )
  }
}
