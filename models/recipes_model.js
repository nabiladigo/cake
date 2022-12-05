
class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

    /**
     * @param {object} data
     * @param { function } callBack Will return error or item
     * @returns function;
    */

    create( data, callBack ) {
        if (!data) return console.log("missing data in first argument");

        if (typeof callBack !== "function") {
        return console.log("missing function in second argument");
        }

        let error, newItem;

        const isEmpty = Object.keys(data).every(field => data[field] === "");

        if (isEmpty) {
        error = { message: `you have empty fields` };
        } else {
        
        newItem = new this.#Model( data, this.#generateId());

        this.#items[newItem.id] = newItem;
        }

        return callBack(error, newItem);
    }
    /**
   * @param {string} itemId
   * @param { function } callBack Will return error or item
   * @returns function;
   */

    findByIdAndDelete( itemId, callBack ) {
        let error = null;
        const item = this.#items[itemId]
        const isDeleted = delete this.#items[itemId];

        if ( !isDeleted ) {
        error = { message: `item with id "${itemId}" can't be found` };
        }

        return callBack(error, item);
    }
    /**
   * @param {string} itemId
   * @param {object} data
   * @param { function } callBack Will return error or item
   * @returns function;
   */

    findByIdAndUpdate( itemId, data, callBack ) {
        let error = null;
        const item = this.#items[itemId];

        if (!item) {
            error = { message: `item can't be found` };
        } else {
            this.#items[itemId] = {
                ...item,
                ...data
            }
        }

        return callBack(error, this.#items[itemId]);
    }
};

class Recipe {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }
}

// at the bottom 
module.exports = new Collection(Recipe, [
    {
      name: "Vanila cake",
      price: 29,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg24zArxEdYGlWl5I2_JKssP6SNllGVn-plnxRhbytTMfI14D1YaI8XY6D73Mz4JathOM&usqp=CAU",
    },
    {
      name: "birthday cake",
      price: 35,
      image: "https://sallysbakingaddiction.com/wp-content/uploads/2022/09/funfetti-birthday-cake.jpg",
    },
    {
      name: "cake",
      price: 50,
      image:"https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?cs=srgb&dl=pexels-brent-keane-1702373.jpg&fm=jpg",
    }
  ]);
