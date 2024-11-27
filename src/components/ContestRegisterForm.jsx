const ContestRegisterForm = () => {
  return (
    <>
      <>
        <div>
          <h2 className="text-center font-bold text-3xl my-[5px]">Register here!</h2>
          <form>
            <div className="flex flex-col my-[10px]">
              <label className="font-semibold mb-[10px]">Email</label>
              <input type="email" placeholder="Your Email" className="border border-gray-200 rounded-lg px-[10px] py-2"/>
            </div>
            <div className="flex flex-col my-[10px]">
              <label className="font-semibold mb-[10px]">Username</label>
              <input type="text" placeholder="Your username" className="border border-gray-200 rounded-lg px-[10px] py-2"/>
            </div>
            <div className="flex flex-col my-[10px]">
              <label className="font-semibold mb-[10px]">Phone Number</label>
              <input type="text" placeholder="Your Phone number" className="border border-gray-200 rounded-lg px-[10px] py-2" />
            </div>
            <button className="bg-green-700 px-[40px] my-[10px] w-full py-3 rounded-md text-white">Register</button>
          </form>
        </div>
      </>
    </>
  );
};

export default ContestRegisterForm;
