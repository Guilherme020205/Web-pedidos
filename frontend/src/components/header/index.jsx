const logo =
  "";

const Header = () => {

  return (
    <div className="bg-red-200 h-16 flex items-center px-5 justify-between">
      <div className="flex flex-row gap-56">
        {logo ? (
          <img src={logo} alt="logo" className="w-40 h-10" />
        ) : (
          <p>Logo</p>
        )}
        <div className="flex flex-row gap-16">
          <button className="bg-white w-16 max-w-16 rounded-full">1</button>
          <button className="bg-white w-16 max-w-16 rounded-full">2</button>
          <button className="bg-white w-16 max-w-16 rounded-full">3</button>
        </div>
       
      </div>
    </div>
  );
};

export default Header;
