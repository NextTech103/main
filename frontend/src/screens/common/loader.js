function Loader({ load }) {
  return (
    <>
      {load ? (
        <div class="loader">
          <div class="vertical-center">
            <img
              src={require("../../image/icons/loading.gif")}
              class="loadinggif"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
