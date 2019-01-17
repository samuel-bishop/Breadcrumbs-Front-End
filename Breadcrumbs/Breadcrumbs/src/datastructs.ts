class Node {
  data: Object;
  next: Node;
  prev: Node;

  constructor(data: Object) {
    this.data = data;
  }
}

export class List {
  head: Node;
  tail: Node;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data: Object) {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
    }

    else {
      let newNode = new Node(data);
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  prepend(data: Object) {
    if (this.head === null) {
      this.head = new Node(data);
      this.tail = this.head;
    }

    else {
      let newNode = new Node(data);
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  isEmpty() {
    if (this.head === null) {
      return true;
    }
    else return false;
  }

  at(index: number) {
    let travel = this.head;
    for (let i = 0; i < index + 1; i++) {
      travel = travel.next;
    }
    return travel;
  }

  purge(data: Object) {
    let travel;
    while (this.head != null) {
      travel = this.head;
      this.head = this.head.next;
      travel = null;
    }
  }
}

