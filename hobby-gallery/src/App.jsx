import "./App.css";
import HobbyCard from "./HobbyCard";

import music from "./assets/music.png";
import gaming from "./assets/gaming.png";
import cricket from "./assets/playing.jpg";
import movies from "./assets/movie.png";
import travelling from "./assets/traveling.jpg";
import photography from "./assets/photography.jpg";

function App() {
  return (
    <div className="app">

      <h1>Student Hobby Gallery</h1>

      <p className="subtitle">
        Explore the hobbies of different students
      </p>

      <div className="gallery">

        <HobbyCard
          hobbyName="Music"
          description="Listening to music is a relaxing hobby that helps students enjoy their free time and refresh their minds."
          image={music}
        />

        <HobbyCard
          hobbyName="Gaming"
          description="Playing games is an entertaining hobby that helps students relax and enjoy their leisure time."
          image={gaming}
        />

        <HobbyCard
          hobbyName="Cricket"
          description="Playing cricket is an enjoyable outdoor activity that improves fitness, teamwork and coordination."
          image={cricket}
        />

        <HobbyCard
          hobbyName="Movies"
          description="Watching movies is a fun way to relax, enjoy stories and explore different types of entertainment."
          image={movies}
        />

        <HobbyCard
          hobbyName="Travelling"
          description="Travelling allows students to explore new places, experience different cultures and create memorable moments."
          image={travelling}
        />

        <HobbyCard
          hobbyName="Photography"
          description="Photography is a creative hobby of capturing beautiful moments, places and memories."
          image={photography}
        />

      </div>

      <footer className="footer">
        <p>STUDENT HOBBY GALLERY</p>
        <span>EXPLORE • ENJOY • CREATE</span>
      </footer>

    </div>
  );
}

export default App;
