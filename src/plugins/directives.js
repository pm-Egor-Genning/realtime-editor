const directives = {
  'mdl': {
    update (el) {
      window.componentHandler.upgradeElement(el);
    },
  },
  'mdl-modal-show': {
    update (el, binding) {
      if (binding.value) {
        el.showModal();
      } else {
        el.close();
      }
    },
  },
};

export default directives;
