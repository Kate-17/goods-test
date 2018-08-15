function getI(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}


var goodApi = Vue.resource('/goods{/id}');

Vue.component('good-form', {
    props: ['goods', 'goodAttr'],
    data: function() {
        return {
            nameOfGood: '',
            descriptionOfGood:'',
            categoryOfGood:'',
            id: ''
        }
    },
    watch: {
        goodAttr: function(newVal, oldVal) {
            this.nameOfGood = newVal.nameOfGood;
            this.descriptionOfGood =newVal.descriptionOfGood;
            this.categoryOfGood =newVal.categoryOfGood;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
        '<h1>Catalog of goods</h1>'+
        '<p>Name: <input type="text"  v-model="nameOfGood" /></p>' +
        '<p>Description: <input type="text" v-model="descriptionOfGood" /></p>' +
        '<p>Category: <select v-model="categoryOfGood"><option>Computer</option><option>Telephone</option></option></select></p>' +
        '<input type="button" value="Save" @click="save" /><p></p>' +
        '<div id="content"><table border="1" width="100%" cellspacing="0" cellpadding="4">' +
        '<tr><th id="cellOfID">ID</th><th  id="cellOfName">Name of good</th>' +
        '<th id="cellOfDescription">Description</th>'+
        '<th id="cellOfCategory">Category</th>' +
        '<th id="cellOfBtnOK"><input type="button" value="Edit"  /></th>'+
        '<th id="cellOfBtnDelete"><input type="button" value="Delete" /></th></tr>'+
        '</table></div>' +
        '</div>',
    methods: {
        save: function() {
            var good = { nameOfGood: this.nameOfGood , descriptionOfGood: this.descriptionOfGood,  categoryOfGood:this.categoryOfGood};

            if (this.id) {
                goodApi.update({id: this.id}, good).then(result =>
                result.json().then(data => {
                    var index = getI(this.goods, data.id);
                this.goods.splice(index, 1, data);
                this.nameOfGood = ''
                this.descriptionOfGood =''
                this.categoryOfGood="Computers"
                this.id = ''
            })
            )
            } else {
                goodApi.save({}, good).then(result =>
                result.json().then(data => {
                    this.goods.push(data);
                this.nameOfGood = '';
                this.categoryOfGood='';
                this.descriptionOfGood='';

            })
            )
            }
        }
    }
});

Vue.component('good-row', {
    props: ['good', 'editMethod', 'goods'],
    template:
    '<div id="content"><table border="1" width="100%" cellspacing="0" cellpadding="4">' +
        '<tr><td id="cellOfID">{{ good.id }}</td><td  id="cellOfName">{{ good.nameOfGood }}</td>' +
        '<td id="cellOfDescription">{{ good.descriptionOfGood }}</td>'+
        '<td id="cellOfCategory">{{good.categoryOfGood}}</td>' +
        '<td id="cellOfBtnOK"><input type="button" value="Edit" @click="edit" /></td>'+
        '<td id="cellOfBtnDelete"><input type="button" value="Delete" @click="del" /></td></tr>'+
    '</table></div>',
    methods: {
        edit: function() {
            this.editMethod(this.good);
        },
        del: function() {
            goodApi.remove({id: this.good.id}).then(result => {
                if (result.ok) {
                this.goods.splice(this.goods.indexOf(this.good), 1)
            }
        })
        }
    }
});

Vue.component('goods-list', {
    props: ['goods'],
    data: function() {
        return {
            good: null
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
        '<good-form :goods="goods" :goodAttr="good" />' +
        '<good-row v-for="good in goods" :key="good.id" :good="good" ' +
        ':editMethod="editMethod" :goods="goods" />' +
        '</div>',
    created: function() {
        goodApi.get().then(result =>
        result.json().then(data =>
        data.forEach(good => this.goods.push(good))
    )
    )
    },
    methods: {
        editMethod: function(good) {
            this.good = good;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<goods-list :goods="goods" />',
    data: {
        goods: []
    }
});