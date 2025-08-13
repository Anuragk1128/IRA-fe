import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function Home() {
  return(
    <div className="flex flex-col min-h-screen ">
      <div className="bg-gray-500">
      <Navbar/>
      </div>
      <div className="flex-1">
        <h1>Home</h1>
      </div>
      <div className="bg-gray-500">
      <Footer/>
      </div>

    </div>
    
  );
}
