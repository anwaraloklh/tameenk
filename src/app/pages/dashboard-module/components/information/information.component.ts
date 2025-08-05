import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.less'
})
export class InformationComponent {
  articles = [
    { title: 'ما هو التأمين الصحي؟', description: 'شرح مبسط حول فوائد التأمين الصحي.', date: new Date() },
    { title: 'أنواع التأمينات', description: 'مقارنة بين التأمينات المختلفة المتوفرة في السوق.', date: new Date() }
  ];

  articleForm!: FormGroup;
  isModalVisible = false;
  isEditing = false;
  editingIndex = -1;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  openAddModal(): void {
    this.isEditing = false;
    this.articleForm.reset();
    this.isModalVisible = true;
  }

  editArticle(article: any): void {
    this.isEditing = true;
    this.editingIndex = this.articles.indexOf(article);
    this.articleForm.patchValue(article);
    this.isModalVisible = true;
  }

  deleteArticle(article: any): void {
    this.articles = this.articles.filter(a => a !== article);
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.articleForm.valid) {
      const value = this.articleForm.value;
      if (this.isEditing) {
        this.articles[this.editingIndex] = { ...value, date: new Date() };
      } else {
        this.articles.push({ ...value, date: new Date() });
      }
      this.isModalVisible = false;
    }
  }
}
