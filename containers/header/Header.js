const Header = () => {
  return (
    <div className="w-100">
      <video className="w-100 video" autoPlay loop muted playsinline>
        <source
          src="https://designfires.pl/wp-content/uploads/2022/07/NewDesignFiresCOMPRESSED.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      `
    </div>
  );
};
export default Header;
/*

<div className="video-wrapper">
      <div
        dangerouslySetInnerHTML={{
          __html: `<video className="video-wrapper-video" autoplay loop muted playsinline>
          <source src="https://designfires.pl/wp-content/uploads/2022/07/NewDesignFiresCOMPRESSED.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>`,
        }}
      />
    </div>
*/
