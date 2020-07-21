import Collection from '../models/Collection';

export default abstract class CollectionsView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    console.log('im in cv console');
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    console.log(this.collection.models);
    for (let model of this.collection.models) {
      console.log('butts');
      const itemParent = document.createElement('div');

      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
