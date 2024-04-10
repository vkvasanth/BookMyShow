import React, { useState } from 'react'
let SCREENS=[
    {
    id:1,
    time:"10:00am",
    seats: [1,1,0,1,1,1,0,0,1,1,1,1],
    },{
        id:2,
        time:"2:00am",
        seats: [1,0,1,1,1,0,1,1,1,,0,1,1],
    },{
        id:3,
        time:"6:00am",
        seats: [1,1,1,0,1,1,1,1,0,1,1,1],
    },

];
const MOVIES =[
    {
        id:1,
        title:"Thunivu",
       image:"https://upload.wikimedia.org/wikipedia/en/6/65/Thunivu_poster.jpg?20230111024028",
        },
        {
            id:2,
            title:"Varisu",
           image:"https://upload.wikimedia.org/wikipedia/en/a/af/Varisu_poster.jpg",
            },
            {
                id:3,
                title:"Akilan",
               image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FJailer_%25282023_Tamil_film%2529&psig=AOvVaw2RedVaK-qqsXISq8G09WDa&ust=1711169363266000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjT2-LFh4UDFQAAAAAdAAAAABAJ",
                },
];
export default function MovieBooking(){
    const [selectedMovie,setSelectedMovie]=useState(null);
    const [selectedScreen,setSelectedScreen]=useState(null);
    const [selectedSeats,setSelectedSeats]=useState([]);
    const handleSeatSelect =(index,screen)=>{
        if(screen?.id!== selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return
        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i)=> i !== index));
            if(selectedSeats.filter((i)=> i !==index).length<1){
                setSelectedScreen(null)
            }
        }
        else{
            setSelectedSeats((seats)=>[...seats,index])
        }
    }
    const handleBooking =()=>{
        alert (`seats ${selectedSeats.map((index)=> index+1).join(",")}booked for ${selectedScreen.movie.title}at ${selectedSeats.time}`)
        SCREENS =SCREENS.map(screen=>{
            if(screen.id === selectedScreen?.id){
                let seats = screen.seats;
                selectedSeats.map((seat)=>(seats[seat]=0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen
        })
        setSelectedMovie(null)
        selectedScreen(null)
        selectedSeats([])
    }
  return (
    <div>
        <h1>MoVie Booking App</h1>
        <h2>Choose Your Movie:</h2>
        <div className='movie-selection'>
            {
                MOVIES.map((movie)=>(
                    <div className='movie'  key={movie.id} onClick={()=>setSelectedMovie(movie)}>
                        <img className='movie-poster' src={movie.image} alt={movie.title}/>
                            <div className='movie-title'>{movie.title}</div>                    
                    </div>
                ))
            }

        </div>
       {
        selectedMovie &&(
            <>
             <h2>Choose your screen</h2>
            <div className='screen-selection'>
                { SCREENS.map((screen)=>{
                        return (
                            <div 
                            key={screen.id}
                            className={`screen ${
                                screen?.id === selectedScreen?.id ? "selected": ""
                            } ${screen.seats.includes(1) ? "available":""}`}
                            > 
                            <div className='screen-number'>Screen {screen.id}</div>
                            <div className='screen-time'>{screen.time}</div>
                            <div className='screen-title'>{selectedMovie.title}</div>
                            <div className='screen-seats'>
                                { screen.seats.map((seat,index)=>{
                                        return (
                                            <div
                                             key={index} 
                                            className={`seat ${
                                                seat ? "availale":"unavaiable"
                                        } ${
                                            selectedSeats.includes(index) && 
                                            selectedScreen?.id === screen.id 
                                            ?  'selected'
                                             :''
                                            }
                                        ${selectedSeats.includes(index) ? "booked":""}
                                        `}
                                        onClick={()=>{
                                            if(seat){
                                                handleSeatSelect(index,{
                                                    ...screen,
                                                    movie:selectedMovie
                                                })
                                            }
                                        }}
                                        >
                                            <div className='seat-number'> {index+1}</div>
                                        </div>
                                        );
                                    })}
                            </div>
                            </div>                 
                        );
                    })}
            </div>
          </>
        )} 
    <div className='booking-sumary'>
        <div className='selected-screen'>
                    {
                        selectedScreen &&(
                            <div>
                                <h3>Selected screen: {selectedScreen.id}</h3>
                            <p>Time:{selectedScreen.time}</p>
                            <p>Movie:{selectedScreen.movie.title}</p>
                            </div>
                        )
                    }
        </div>
        <div className='selected-seat'>
            {
                selectedScreen && selectedSeats?.length > 0 && (
                    <div>
                        <h3>Selected seats: <>{selectedSeats.map(index => index+1).join(",")}</></h3>
                        <h3>No of tickets: {selectedSeats?.length}</h3>
                    </div>
                )
            }

        </div>

    </div>
    <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>Booking</button>
    </div>
  );
}
