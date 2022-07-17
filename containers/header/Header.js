const Header = () => {
  return (
    <div className="video-wrapper">
      <div
        dangerouslySetInnerHTML={{
          __html: `<video className="video-wrapper-video" autoplay loop muted playsinline>
          <source src="https://designfires.pl/wp-content/uploads/2022/07/DesignFIresPRO-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>`,
        }}
      />
    </div>
    /* 
<div
        dangerouslySetInnerHTML={{
          __html: `<video className="video-wrapper-video" autoplay loop muted playsinline>
<source src="https://designfires.pl/wp-content/uploads/2022/07/DesignFIresPRO-1.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>`,
        }}
      />



    <video className="video-wrapper-video" autoplay loop muted playsinline>
<source src="https://designfires.pl/wp-content/uploads/2022/07/DesignFIresPRO-1.mp4" type="video/mp4" />
    
    
    
    
    id="home" className="video-wrapper"> https://designfires.pl/wp-content/uploads/2022/07/DesignFIresPRO-1.mp4
      <video
        id="header-movie"
        autoPlay
        loop
        muted
        src="http://designfires.pl/wp-content/uploads/2022/07/DesignFIresPRO-1.mp4"
        allowFullScreen
      ></video>
    </div>*/
  );
};
export default Header;
