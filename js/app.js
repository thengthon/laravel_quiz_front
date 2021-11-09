new Vue ({
    el: '#app',
    data: {
        url: 'http://127.0.0.1:1000/api/books',
        books: [],
        isEditing: false,
        title: '',
        body: '',
        author_id: 1,
        id: 0
    },
    methods: {
        getBooks: function() {
            axios.get(this.url).then(response => {
                this.books = response.data.data;
            });
        },
        add: function() {
            if(this.title !== '' && this.body !== '' && this.author_id !== '') {
                let book = {
                    "title": this.title,
                    "body": this.body,
                    "author_id": this.author_id
                }
                axios.post(this.url, book).then(response => {
                    console.log(response.data.Message);
                    this.title = '';
                    this.body = '';
                    this.author_id = 1;
                    this.getBooks();
                });
            }
        },
        update: function() {
            if(this.title !== '' && this.body !== '' && this.author_id !== '') {
                let book = {
                    "title": this.title,
                    "body": this.body,
                    "author_id": this.author_id
                }
                axios.put(this.url + '/' + this.id, book).then(response => {
                    console.log(response.data.Message);
                    this.title = '';
                    this.body = '';
                    this.author_id = 1;
                    this.id = 0;
                    this.isEditing = false;
                    this.getBooks();
                });
            }
        },
        edit: function(id) {
            this.isEditing = true;
            axios.get(this.url + '/' + id).then(response => {
                let book = response.data.data;
                this.id = book.id;
                this.title = book.title;
                this.body = book.body;
                this.author_id = book.author_id;
            });
        },
        remove: function(id) {
            axios.delete(this.url + '/' + id).then(response => {
                console.log(response.data.Message);
                this.getBooks();
            });
        },
    },
    mounted() {
        this.getBooks();
    },
})