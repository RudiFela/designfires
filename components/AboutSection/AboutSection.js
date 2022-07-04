const AboutSection = (props) => {
  return (
    <div className="about-section">
      <h2>{props.title}</h2>
      <ul>
        <li>
          {props.listItem1}
          <div className="more">
            (Many accidents happen when refueling the Ethanol fireplaces). DFE
            has an automatic ethanol pump built-in, which stops automatic when
            the ethanol tank is full, it makes it 100% safe to refuel, and very
            easy to refuel, as there is only a silicone hose in between the DFE
            and the ethanol can.
          </div>
        </li>
        <li>
          {props.listItem2}
          <div className="more">
            {" "}
            thanks to many safety sensor and electronic refueling,DFE provides
            from 3.6 - 21.6kW in heating. Market&apos;s largest ethanol tank as
            standard, that provides up to 12 - 20 hours of burning time. Extra
            we can make the ethanol tank as big as you wish.
          </div>
        </li>
        <li>
          {props.listItem3}
          <div className="more">
            {" "}
            as standard we make your fireplace, according to your tastes and
            dreams. It can be made in length from 500mm to 2400mm, we can build
            around it for you in steel or concrete, 100% according to your
            needs. You decide for yourself the decoration from the large
            selection of luxury accessories. DFE burns clean and does not smell,
            as we have the market&apos;s best quality Bio-Ethanol fuel
          </div>
        </li>
        <li>{props.listItem3}</li>
        <li>{props.listItem4}</li>
      </ul>

      <p>{props.paragraph}</p>
      <h3>from: {props.price}€</h3>
      <h3></h3>
    </div>
  );
};
export default AboutSection;
