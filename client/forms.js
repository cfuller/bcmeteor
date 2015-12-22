AutoForm.addHooks(
    ["createVideo"],
    {
      before   : {
        method: CfsAutoForm.Hooks.beforeInsert
      },
      after    : {
        method: CfsAutoForm.Hooks.afterInsert
      }
    }
);