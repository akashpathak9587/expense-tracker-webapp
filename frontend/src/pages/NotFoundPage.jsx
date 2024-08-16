const NotFoundPage = () => {
  return (
    <section>
      <div className="text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <img src="./404.svg" alt="" />
            </div>
            <p className="text-sm md:text-base text-[#f6009b] p-2 mb-4">
              The stuff you were looking for {"doesn't"} exist
            </p>
            <a href="/" className="bg-transparent hover:bg-[#f6009b] text-[#f6009b] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#f6009b] hover:border-transparent">
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
