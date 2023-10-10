const modal = MicroModal.init({
    awaitCloseAnimation: true,// set to false, to remove close animation
    onShow: function(modal) {
      console.log("micromodal open");
    },
    onClose: function(modal) {
      console.log("micromodal close");
    }
  });

export {modal}