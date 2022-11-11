const rainbow = "RAINBOW";
        let count = 0;

        const styleLetter = (letter) => {
            const r = Math.random() * (255 - 0) + 0;
            const b = Math.random() * (255 - 0) + 0;
            const g = Math.random() * (255 - 0) + 0;
            letter.css("color",`rgb(${r},${g},${b})`)
            letter.css("font-size",`32px`)
            letter.css("display","inline-block")
        }
        
        const moveLetters = (index) => {
            for(let i = 0; i < rainbow.length; i++){
                if(i === index){
                    console.log($(`#r-${i}`))
                    // $(`#r-${i}`).css("transform:", "translateY(-5px)")
                }
                else  {
                    // $(`#r-${i}`).css("transform:", "translateY(0px)")
                }
            }
        }

        const createLetter = (index) => {
            const letterSpan = $(`<span id="r-${index}"></span>`)
            letterSpan.text(rainbow[index])
            styleLetter(letterSpan)
            return letterSpan
            
        }
        
        function saveTodos() {
            const todos = $("#todos").children()

            let todoList = []
            todos.each(function(){
                const todoAsText = $("p",this).text()
                todoList.push(todoAsText)
            })

            todoList.reverse();
            
            const listAsString = JSON.stringify(todoList)
            localStorage.setItem("todos",listAsString)
        }

        function getTodos() {
            const todosAsString = localStorage.getItem("todos")
            if(!todosAsString){
                return
            }

            const todos = JSON.parse(todosAsString) || [];
            todos.forEach(todo => {
                addTodoToTodos(todo)
            })
        }

        function createTodo(text) {
            const id = `todo-${Math.floor(Math.random() * (10000 - 0) + 0)}`

            const todoBox = $(`<div id="${id}"></div>`)
            todoBox.addClass("card")

            const todoText = $(`<p id="${id}-text">${text}</p>`)
            
            const removalButton = $(`<button id="${id}-remove">X</button>`)
            removalButton.addClass("card-remove-button")
            
            todoBox.append(removalButton)
            todoBox.append(todoText)
            
            removalButton.click(function() {
                const parent = $(this).parent()
                parent.remove()
            })

            return todoBox
        }

        function getTodoValue() {
            const input = $("#todo-input");
            const todoValue = input.val()
            input.val("")

            return todoValue
        }

        function addTodoToTodos(value) {
            if(!value || typeof value !== "string"){
                value = getTodoValue()
            }

            if(value == ""){
                return
            }
            const todo = createTodo(value)
            $("#todos").prepend(todo)
            saveTodos()
        }

        function addTodo() {
            addTodoToTodos()
        }

      $(document).ready(function () {
        // $("p").text("")
        // $("p").css("color","red")
        $("#hide-text-btn").click(function () {
          $("p").hide();
          $(this).text("hidden");
        });

        $("#show-text-btn").click(function () {
          $("p").show();
        });

        $("#toggle1").click(function() {
            const displayState = $("#p-1").css("display")
            console.log("DISPLAY", displayState)
            if(displayState === "block"){
                $(this).text("Show text 1")
            }
            else {
                $(this).text("Hide text 1")
            }
            $("#p-1").toggle()
        })

        $("#translate-text-btn").click(function() {
            const text = $("#translatable-text");
            const lang = text.attr("lang")
            if(lang === "lt"){
                text.text("Löksås ipsum groda samtidigt smultron trevnadens omfångsrik kunde sig från hans blivit tiden, hela kunde icke tidigare inom vid räv är tre trevnadens")
                text.attr("lang","sv")
            }
            else {
                text.text("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut commodi aliquam culpa natus consequatur mollitia similique blanditiis vitae sapiente minima! Accusantium velit, expedita quam et ipsam at perferendis illum atque!")
                text.attr("lang","lt")
            }
        })

        $(".box").hover(function(){
            const lid = $(".box-lid",this)
            // lid.fadeOut()
            lid.slideUp(1000)
        },function() {
            const lid = $(".box-lid",this)
            // lid.fadeIn()
            lid.slideDown()
        })

        for(let i = 0; i < rainbow.length; i++) {
            // const letterSpan = `<span>${rainbow[i]}</span>`
            const letterSpan = createLetter(i)
            $("#rainbow-text").append(letterSpan);

        }

        // setInterval(() => {
        //     const letter = $(`#r-${count}`)
        //     styleLetter(letter)
        //     moveLetters(count)
        //     if(count <= rainbow.length-1){
        //         count += 1
        //     }
        //     else {
        //         count = 0
        //     }
        // },70)

        getTodos()
        
        $("#todo-input").keypress(function(e){
            let key = e.which;
            if(key == 13) {
                addTodo()
            }
        })

        $("#todo-button").click(addTodo)

        
      });