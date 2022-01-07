const SaveKey = 'RightClickAction';
chrome.contextMenus.create(
  {
    type: 'normal',
    title: '添加到书架',
    id: 'addToShelf',
    contexts: ['all'],
    onclick: async (info) => {
      localStorage.setItem(SaveKey, info.selectionText);
    },
  },
  function () {
    console.log('contextMenus are create.');
  },
);
