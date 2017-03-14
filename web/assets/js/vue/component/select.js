Vue.component('selectItem', {
    template: '#select-item',
    props: {
        dbObj: Object,
        model: Object,
        items: Object,
        foreignKeys: [],
        foreignTables: []
    },
    data: function () {
        return {
            selected: false
        }
    },
    computed: {
        object: function () {
            if (this.model && this.model.isFK === false) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        changeStatus: function () {
            this.model.status = !this.model.status;
            console.log(this.model.table);
            if (this.model.status && this.dbObj[this.model.table]) {
                this.foreignTables.push(this.model.table);
                this._addRow(this.model.table);
            } else if (!this.model.status) {
                delete this.model.rows;
                this._updateDisplaySelect();
            }
            this.selected = !this.selected;
        },
        _addRow: function ($tableName) {
            var $fields = this.dbObj[$tableName];

            for (var $field in $fields) {
                if ($field[0] === '_') {
                    continue;
                }
                var $table = this.model.table;
                var $isFK = false;

                if (!this.model.rows) {
                    Vue.set(this.model, 'rows', []);
                }

                if ($fields._FK && $fields._FK[$fields[$field].name]) {
                    $table = $fields._FK[$fields[$field].name].tableName;
                    $isFK = true;
                }

                this.model.rows.push({
                    'name': $fields[$field].name,
                    'table': $table,
                    'isFK': $isFK,
                    'translation': $fields[$field]._field_translation,
                    'status': false,
                    'display': true,
                    'firstParent': false
                });
            }
            this._updateDisplaySelect();
        },
        _updateDisplaySelect: function () {
            if (this.model.firstParent === false) {
                return
            }
            $display = (!(event.target.checked === true));

            for (var $index in this.items.rows) {
                console.log(this.items.rows[$index]);
                if (this.items.rows[$index].firstParent === true && this.items.rows[$index].status === false) {
                    this.items.rows[$index].display = $display;
                }
            }
        }
    }
});