import Box from "@/components/Box";
import Header from "@/components/Header";
import Message from "@/components/Message";

export default function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg h-screen overflow-hidden overflow-y-hidden mx-2">
      <Header>
        <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">Welkom</h1>
            <div className="mt-4">
              <Message title="NOT OFFICIAL!"/>
            </div>
          </div>
      </Header>
      <div className="m-5 gap-5 flex flex-row">
        <div className="relative text-white hover:shadow-glow w-1/3 bg-neutral-800">
          <Box className="bg-neutral-800 flex justify-center items-center p-4">
            Lorem ipsum dolor sit amet, con0sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Box>
          <div className="absolute inset-0 rounded-lg shadow-glow"></div>
        </div>
        <div className="relative text-white hover:shadow-glow w-1/3 bg-neutral-800">
          <Box className="bg-neutral-800 flex justify-center items-center p-4">
            Netus et malesuada fames ac turpis egestas sed tempus. Posuere lorem ipsum dolor sit amet consectetur. Eu turpis egestas pretium aenean pharetra magna ac placerat. In iaculis nunc sed augue lacus. Nulla facilisi nullam vehicula ipsum a arcu. Cursus sit amet dictum sit amet justo donec enim diam. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Elementum integer enim neque volutpat ac tincidunt. Amet mauris commodo quis imperdiet massa. Elit scelerisque mauris pellentesque pulvinar pellentesque.
          </Box>
          <div className="absolute inset-0 rounded-lg shadow-glow"></div>
        </div>
        <div className="relative text-white hover:shadow-glow w-1/3 bg-neutral-800">
          <Box className="bg-neutral-800 flex justify-center items-center p-4">
            Nisl purus in mollis nunc. Dolor magna eget est lorem ipsum dolor sit amet. Amet massa vitae tortor condimentum lacinia quis. Vitae nunc sed velit dignissim sodales ut eu sem. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Mi bibendum neque egestas congue quisque egestas diam in arcu. Mi eget mauris pharetra et ultrices neque. Aliquam ut porttitor leo a diam sollicitudin tempor. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Mi bibendum neque egestas congue quisque egestas diam in arcu. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Sed vulputate odio ut enim blandit volutpat. Nibh ipsum consequat nisl vel pretium. Tortor dignissim convallis aenean et tortor at risus viverra. Pretium aenean pharetra magna ac placerat.
          </Box>
          <div className="absolute inset-0 rounded-lg shadow-glow"></div>
        </div>
      </div>
    </div>
  )
}
