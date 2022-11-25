const LabelWraper = (props) => {
  return (
    <div className="bg-success p-3" style={{ borderRadius: "15px" }}>
      {props.children}
    </div>
  );
};
export default LabelWraper;
