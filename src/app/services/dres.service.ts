import {Injectable} from '@angular/core';
import {ApiClientSubmission, EvaluationClientService, SubmissionService} from "../../../openapi/dres";

@Injectable({
    providedIn: 'root'
})
export class DresService {

    constructor(private submitter: SubmissionService, private evaluationService: EvaluationClientService) {
    }

    public submit(value: string) {
      // TODO return inner observable and in case no evaluation exists return observable of undefined or so
        this.evaluationService.getApiV2ClientEvaluationList().subscribe(list => {
            if (list.length > 0) {
                const id = list[0].id // only using one open evaluation
                this.submitter.postApiV2SubmitByEvaluationId(id, {
                    answerSets: [
                        {
                            answers: [
                                {
                                    text: value
                                }
                            ]
                        }
                    ]
                } as ApiClientSubmission).subscribe(ans => {

                })
            }

        })
    }

}
