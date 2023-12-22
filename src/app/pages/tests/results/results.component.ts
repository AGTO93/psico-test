import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, public answerService: AnswerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Valor del parámetro id:', id);
  
      this.answerService.findById(id).subscribe();
    });
  }

}
