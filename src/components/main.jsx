import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border- mx-3">
          <div>
         <video src="assets/man.mp4" controls={false} height={550} loop autoPlay muted className="w-100" style={{"object-fit":"fill"}} ></video>
         </div>
          <div className="card-img-overlay d-flex align-items-end">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Easy Shopping</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
